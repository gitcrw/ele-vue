import fs from 'fs'

/**
 * 向文件写入内容
 */
export function writeFile(path, content) {
    const data = typeof content === 'object' ? JSON.stringify(content) : content
	return new Promise((resolve, reject) => {
		fs.writeFile(path, data, (err) => {
			err ? reject(err) : resolve()
		})
	})
}

/**
 * 读取文件
 */
export function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf-8', (err, data) => {
			if (err) {
				reject(err)
			} else {
				try {
					const val = JSON.parse(data)
					resolve(val)
				} catch (err) {
					resolve(data)
				}
			}
		})
	})
}
