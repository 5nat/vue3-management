// api文件
type PromiseRes<T = {}> = Promise<MangeResult<T>>

interface MangeResult<T = {}> {
  data: {
    errmsg?: string,
    errno?: number
    code?: number,
    data: T,
    message?: string
  }
}
// 登录返回数据
interface AdminLoginRes {
  token: string,
  tokenHead: string
}
// 用户信息返回数据
interface AdminInfoRes {
  menus: []
}

// 用户列表返回数据
interface AdminListRes {
  list: {}[];
  total:number
}
