import { request } from 'network/request';
export function setproject(data) {
    console.log(data);
    return request({
        url: 'api/setimgproject',
        method: 'post',
        data
    })
}
export function setslideshow(data) {
    console.log(data);
    return request({
        url: 'api/setslideshow',
        method: 'post',
        data
    })
}
export function setrecommend(data,cookie) {
    console.log(data);
    document.cookie = 'numAndLink=' + cookie;
    const cookies = document.cookie;
    return request({
        url: 'api/setrecommend',
        method: 'post',
        headers: { Cookies:cookies },
        data
    })
} 