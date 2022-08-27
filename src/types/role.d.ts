// 角色信息
interface RoleObjItf {
  id: number;
  name: string
}

interface RoleItf {
  list: RoleObjItf[];
  pageNum: number;
  pageSize: number;
  total: number;
  totalPage: number
}