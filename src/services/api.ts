import { post, get} from '../utils/request';

/**
 * 接口地址
 */
export const apiUrl = {
    loginsave: 'user/loginsave.php',                 //登录
    getCharData: 'dataanalytics/call.php',          //数据统计 table 列表
    getTimeData: 'dataanalytics/calltimes.php',     //数据统计 时长 列表
    getPieData: 'dataanalytics/callpie.php',        //数据统计 意向 列表
    getCallingData: 'calltask/apicallingdata.php',  //正在呼叫
    exportInfor : 'calltask/exportcallinfo.php',   //导出数据
    listSelData : 'calltask/apicalldata.php',      //下拉选择数据
    upload      : 'calltask/uploadfile.php',            //多条导入
    singleInput : 'calltask/addsinglephonedata.php',    //单条导入
    del         : 'calltask/delcallinfo.php',           //删除
    callPhone   : 'calltask/docall.php',                //拨打电话
    task        : 'calltask/startstopcallinfo.php',     //任务 开启 关闭
    progress    : 'calltask/getuploadingcount.php'      //文件导入进度
}

/**
 * post提交
 * @param {urlname} 接口地址 
 * @param {param} 接口参数 
 */
export async function postServer(urlname: any, param = null): Promise<any>{
    return post(urlname, param)
}

/**
 * get提交
 * @param {urlname} 接口地址 
 * @param {param} 接口参数 
 */
export async function getServer(urlname: any, param = null): Promise<any>{
    return get(urlname, param)
}

export async function CharData(param: any): Promise<number[] | undefined>{
    if(param.id == '1'){
        return [5000, 4500, 4600, 5200, 4500, 4700, 4900]
    }
    if(param.id == '2'){
        return [4700, 4200, 4200, 5000, 4000, 3000, 3400]
    }
    if(param.id == '3'){
        return [300, 300, 400, 200, 500, 1700, 1500]
    }
  }
/**
 * 获取菜单
 */
export async function getMenu(param: any){
  return [{
      name: '首页',
      icon: 'home',
      url: '/',
      child: null
  },{
      name: '数据统计',
      icon: 'stock',
      child: [
        {
            name: '呼叫数量统计',
            url: '/callcount'
        },
        {
            name: '呼叫时长统计',
            url: '/calltime'
        },
        {
            name: '数据分类统计',
            url: '/calltype'
        }
      ]
  },,{
    name: '呼叫中心',
    icon: 'container',
    child: [
      {
          name: '正在呼叫',
          url: '/calling'
      },
      {
          name: '通话数据',
          url: '/calldata'
      }
    ]
}]
}