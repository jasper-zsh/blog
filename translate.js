const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const axios = require('axios');
require('dotenv').config(); // 从.env文件加载环境变量

// 配置部分
const CONTENT_DIR = path.join(__dirname, 'content');
const TARGET_LANG = 'en';
const API_KEY = process.env.DASHSCOPE_API_KEY; // 请设置百炼平台的API Key
const MODEL_ID = 'qwen-plus'; // 使用的模型ID

// 检查是否提供了API密钥
if (!API_KEY) {
  console.error('请设置DASHSCOPE_API_KEY环境变量');
  process.exit(1);
}

// 扫描所有Markdown文件
async function scanMarkdownFiles() {
  const pattern = path.join(CONTENT_DIR, '**/*.md');
  const files = await glob(pattern);
  
  // 过滤掉已经是翻译文件的文件（包含语言代码的文件）
  const originalFiles = files.filter(file => {
    const basename = path.basename(file);
    // 检查文件名是否符合"文件名.语言.md"模式
    const isTranslation = basename.includes('.') && basename.endsWith('.md') && 
                         basename.split('.').length === 3 && basename.split('.')[1].length <= 5;
    
    return !isTranslation;
  });
  
  return originalFiles;
}

// 检查翻译文件是否存在
function checkTranslationExists(originalFile) {
  const dir = path.dirname(originalFile);
  const basename = path.basename(originalFile, '.md');
  const translationFile = path.join(dir, `${basename}.${TARGET_LANG}.md`);
  
  return {
    exists: fs.existsSync(translationFile),
    translationFile: translationFile
  };
}

// 调用百炼平台API进行翻译
async function translateContent(content) {
  try {
    const response = await axios.post(
      'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      {
        model: MODEL_ID,
        input: {
          messages: [
            {
              role: 'system',
              content: 'You are a professional translator. Translate the following Chinese text to English, maintaining the technical accuracy and natural flow of the content.'
            },
            {
              role: 'user',
              content: content
            }
          ]
        },
        parameters: {
          incremental_output: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'X-DashScope-SSE': 'disable' // 禁用SSE
        }
      }
    );
    
    // 提取翻译结果
    if (response.data && 
        response.data.output && 
        response.data.output.text) {
      return response.data.output.text;
    } else {
      throw new Error('Invalid response format: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('Translation error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// 处理单个文件的翻译
async function processFile(originalFile) {
  const { exists, translationFile } = checkTranslationExists(originalFile);
  
  if (exists) {
    console.log(`翻译文件已存在: ${translationFile}`);
    return;
  }
  
  console.log(`正在翻译: ${originalFile}`);
  
  try {
    // 读取原始文件内容
    const content = fs.readFileSync(originalFile, 'utf8');
    
    // 调用翻译API
    const translatedContent = await translateContent(content);
    
    // 写入翻译文件
    fs.writeFileSync(translationFile, translatedContent, 'utf8');
    console.log(`翻译完成: ${translationFile}`);
  } catch (error) {
    console.error(`翻译失败 ${originalFile}:`, error.message);
  }
}

// 主函数
async function main() {
  try {
    const files = await scanMarkdownFiles();
    console.log(`找到 ${files.length} 个Markdown文件`);
    
    for (const file of files) {
      await processFile(file);
    }
    
    console.log('所有文件处理完成');
  } catch (error) {
    console.error('处理过程中出错:', error.message);
    process.exit(1);
  }
}

main();