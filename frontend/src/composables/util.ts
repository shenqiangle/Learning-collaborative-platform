import { 
    ElNotification,
    ElMessageBox,
    ElMessage,
     } 
from "element-plus";
import { da } from "element-plus/es/locale/index.mjs";



//成功提示
export function toast(message: string, type: 'success' | 'warning' | 'info' | 'error', dangerouslyUseHTMLString: boolean = false) {
    ElNotification({
        message,
        type,
        duration: 3000,
        dangerouslyUseHTMLString,
    })
}


//消息提示框
export function showModal(content: string, type: 'success' | 'warning' | 'info' | 'error', title?: string){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type,
        }
      )        
}
//信息提示
export function showMessage(message: string,type: 'success' | 'warning'){
    return ElMessage({
        message,
        type,
      })
}

//扁平化处理
export function getFlatMenuList(data: any[]) {
    let result: any[] = [];

    data.forEach(item => {
        const { children, ...rest } = item;

        result.push(rest);

        if (children) {
            result = result.concat(getFlatMenuList(children));
        }
    });

    return result;
}

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String}
 */
export function getUrlWithParams() {
    const url = {
      hash: location.hash.substring(1),
      history: location.pathname + location.search
    };
    return url['history'];
  }


export function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const m = today.getMonth() + 1; // 注意月份从 0 开始，所以要加 1
    const month = m < 10 ? '0' + m : '' + m;
    const d = today.getDate();
    const day = d < 10 ? '0' + d : '' + d;

    
    
    return {year,month,day};
}

