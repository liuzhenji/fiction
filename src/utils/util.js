
  import wepy from 'wepy';
  import _ from 'lodash';

  const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  };

  const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
  };
  /**
   * 计量单位
   */
  const UNIT_OF_MEASUREMENT = '看点';
  /**
   * 人民币到看点的比例
   */
  const RMB_TO_KANDIAN_RATIO = 100;

  const fetch = ({ url, data, header }) => {
    return wepy.request({
      url,
      data,
      header,
      method: 'GET'
    });
  };

  const post = ({ url, data, header }) => {
    return wepy.request({
      url,
      data,
      header,
      method: 'POST'
    });
  };

  const convertO2O = (source, condition, merge, isSaveSource = true)  => {
    let dist = {}
    for (let key in source) {
      if (condition.hasOwnProperty(key)) {
        const val = source[key]
        const todo = condition[key]
        if (_.isString(todo)) {
          dist[todo] = val
        }
        if (_.isFunction(todo)) {
          dist[key] = todo(val, source)
        }
        if (_.isObject(todo)) {
          for (let key2 in todo) {
            dist[key2] = todo[key2](val, source)
          }
        }
      } else {
        if (isSaveSource)
          dist[key] = source[key]
      }
    }
    return _.assign(dist, merge);
  }

  const doesCheckMode = code => {
    return code === 1;
  }

  //prod
  const urlPrefix = 'https://www.1jtec.com/fic';
  //dev
  // const urlPrefix = 'http://localhost:8080';
  module.exports = {
    formatTime: formatTime,
    fetch: fetch,
    post: post,
    convertO2O: convertO2O,
    urlPrefix: urlPrefix,
    doesCheckMode,
    unit: UNIT_OF_MEASUREMENT,
    ratio: RMB_TO_KANDIAN_RATIO
  };
 