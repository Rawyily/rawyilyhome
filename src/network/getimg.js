import { request } from 'network/request';
export function getslideshowimg() {
  return request({
    url: 'api/getslideshowimg',
    method: 'get', 
    //返回7张1400X380(px)的轮播图src(base64) img1/img2/.../img7
  });
}
export function getrecommendimg() {
  return request({
    url: 'api/getrecommendimg',
    method: 'get', 
    //返回5张260x206(px)的推荐图src(base64) img1/img2/.../img5
  });
}
export function getprojectdata() {
  return request({
    url: 'api/getprojectdata',
    method: 'get', 
    //返回250x250img
  });
}  