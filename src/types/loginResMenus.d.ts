// 用户登录返回的菜单信息

interface MenusObj {
  parentId: number;
  id: number;
  title: string;
  hidden: 0 | 1;
  children?: MenusObj[];
  // 
  name: string;
  icon: string | null;
  // 
  // createTime?: string;
  // level?:number;
  // sort?:number
}

interface NewMenus {
  [key: number]: MenusObj
}