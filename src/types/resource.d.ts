// 资源信息
interface RecourseObjItf {
  categoryId: number;
  createTime: string;
  description: string;
  id: number;
  name: string;
  url: string
}

// 资源（分页）
interface RecourseItf {
  list: RecourseObjItf[];
  pageNum: number;
  pageSize: number;
  total: number;
  totalPage: number
}

// 资源模块
interface RecourseCategoryItf {
  id: number;
  name: string
}