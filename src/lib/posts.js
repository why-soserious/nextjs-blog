import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'

// 解析posts中的md文件

const postsDirectory = path.join(process.cwd(), 'posts')        // xxxxx/jswebsite/posts

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data      // 包含元数据和正文
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}


// 动态路由获取路由的id
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)  
  /*
    next.js的约定
    we need return an array like :
    [
      {
        params: {
          id: 'pre-rendering'
        }
      },
      {
        params: {
          id: 'sg-ssr'
        }
      },
    ]
  */
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })

}

// 动态路由生成页面的sg数据
export async function getPostData(id) {
  const fileName = path.join(postsDirectory, `${id}.md`)
  const fileContent = fs.readFileSync(fileName, 'utf-8')
  const matterResult = matter(fileContent)

  const processedContent = await remark()
                                 .use(html)
                                 .process(matterResult.content)
  const contentHtml = processedContent.toString()
  
  return {
    id, 
    contentHtml,
    ...matterResult.data
  }
}