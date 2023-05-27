import { GET, POST, PUT, DELETE } from '@/utils/request';

// 图书分类
export const bookSystemList = (data) => { 
  return GET({
    url: '/dcc/dccCenter/book/bookSystemList',
    method: 'get',
    data
  });
};