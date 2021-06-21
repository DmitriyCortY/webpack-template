const path = require('path')
const fs = require('fs')
const dir = path.resolve(__dirname, `src/`)
const extension = '.html'

const include = content => {
    const match = content.match(/@@include\(([\s\S]+?)\)/g)
    if(!match) return content
    let newContent = content
    for(let item of match){
        const pathToFile = item.replace(`@@include('`, ``).replace(`')`, ``)
        const componentPath = path.resolve(dir, pathToFile)
        const componentContent = fs.readFileSync(componentPath, 'utf8')
        newContent = newContent.replace(item, componentContent)
    }
    return newContent
}

module.exports = {
    convert: async (content) => {
        content = await include(content)
        return content
    }
}