import SftpClient from 'ssh2-sftp-client'
import { sftpQueue } from '../services/order_job.service'

class SftpController {
  private client: SftpClient

  constructor() {
    this.client = new SftpClient()
  }

  public downloadOrders = async (): Promise<void> => {
    await this.client.connect({
      host: 'your_sftp_server',
      port: 22,
      username: 'your_username',
      password: 'your_password',
    })

    const list = await this.client.list('/path/to/directory')

    for (const file of list) {
      const localPath = `/local/path/to/download/${file.name}`
      await this.client.get(`/path/to/directory/${file.name}`, localPath)
      sftpQueue.add('processSftpXmlFile', { filePath: localPath })
    }
  }
}

export default SftpController
