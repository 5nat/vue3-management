import request from './request'

// 登录接口
export const adminLoginApi = (data: { password: string; username: string }): PromiseRes<AdminLoginRes> => request({
  url: '/admin/login',
  method: 'POST',
  data
})

// 获取当前用户信息
export const getAdminInfoApi = (): PromiseRes<AdminInfoRes> => request({
  url: '/admin/info',
  method: 'GET'
})

// 退出接口
export const adminLogoutApi = (): PromiseRes => request({
  url: '/admin/logout',
  method: 'POST',
})

// 获取用户数据列表
export const getAdminListsApi = (data: { keyword: string; pageNum: number; pageSize: number }): PromiseRes<AdminListRes> => request({
  url: '/admin/list',
  method: 'GET',
  params: data
})

// 修改用户信息
export const updateAdminApi = (id: number, data: AdminObjItf): PromiseRes => request({
  url: `/admin/update/${id}`,
  method: 'POST',
  data,
})

// 添加|注册用户
export const registerAdminApi = (data: AdminObjItf): PromiseRes => request({
  url: '/admin/register',
  method: 'POST',
  data,
})

// 获取所有角色
export const getRoleListAll = (): PromiseRes<RoleObjItf[]> => request({
  url: '/role/listAll',
  method: 'GET'
})

// 根据用户id获取角色
export const getAdminRoleById = (adminid: number): PromiseRes<RoleObjItf[]> => request({
  url: `/admin/role/${adminid}`,
  method: 'GET'
})

// 分配用户角色---------也可用qs库转换为 Form Data 数据
export const updateAdminRole = (data: { adminId: number; roleIds: string }): PromiseRes => request({
  url: '/admin/role/update',
  method: 'POST',
  params: data
})


//-------------------------------------------------- 
// 饼图数据
export const getAdminStat = (): PromiseRes<indexDataItf> => request({
  url: 'http://kumanxuan1.f3322.net:8360/admin/stat',
  method: 'GET'
})


// -------------------------------------------------
// 获取角色列表（分页）
export const getRoleList = (data: { keyword: string; pageNum: number; pageSize: number }): PromiseRes<RoleItf> => request({
  url: '/role/list',
  method: 'GET',
  params: data
})

//---------------------------------------------------
// 获取资源列表(分页)
export const getResourceList = (data: { categoryId?: number; nameKeyword?: string; pageNum: number; pageSize: number; urlKeyword?: string }): PromiseRes<RecourseItf> => request({
  url: '/resource/list',
  method: 'GET',
  params: data
})

// 获取所有资源列表
export const getResourceListAll = (): PromiseRes<RecourseObjItf[]> => request({
  url: '/resource/listAll',
  method: 'GET'
})

// 获取所有资源分类列表
export const getResourceCategoryList = (): PromiseRes<RecourseCategoryItf[]> => request({
  url: '/resourceCategory/listAll',
  method: 'GET'
})

// 获取角色相关资源
export const getRoleResourceList = (roleId: number): PromiseRes<RecourseObjItf[]> => request({
  url: `/role/listResource/${roleId}`,
  method: 'GET'
})