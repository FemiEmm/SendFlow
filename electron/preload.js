import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('sendnestDesktop', {
  platform: process.platform,
  isDesktop: true
})