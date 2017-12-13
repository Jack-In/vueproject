/*
* @Author: allen100309
* @Date:   2017-12-12 11:13:12
* @Last Modified by:   allen100309
* @Last Modified time: 2017-12-12 22:57:08
*/
//暴露单独的每个方法
export function getData(name) {
    //获取本地localStorage数据，并返回成数组格式
    return JSON.parse(localStorage.getItem(name) || '[]');
}
export function setData(name,json) {
    let data = getData(name);
    let hasDta = false;//标识变量，假设没有
    data.forEach(function(item,index){
        if(item.id === json.id){
            hasDta = true;
            item.count += json.count//如果是减少数量就是负值
        }
    })
    if(!hasDta){
        data.push(json);
    }
    //因为可能存在数据，存在的话就在原数剧中找到就
    localStorage.setItem(name,JSON.stringify(data))
}
export function delData(name,id) {
    let data = getData(name);
    let index = data.findIndex(function(ietm){
        if(ietm.id === id){
            return ietm;
        }
    });
    data.splice(index,1);
    //因为可能存在数据，存在的话就在原数剧中找到就
    localStorage.setItem(name,JSON.stringify(data))
}
export function upData(name,json) {
    let data = getData(name);
    let index = data.findIndex(function(ietm){
        if(ietm.id === json.id){
            return ietm;
        }
    });
    data[index].count += json.num;
    if(data[index].count <= 0 ){//不能让他一直减下去，只能减到1
        return;
    }
    //因为可能存在数据，存在的话就在原数剧中找到就
    localStorage.setItem(name,JSON.stringify(data))
}