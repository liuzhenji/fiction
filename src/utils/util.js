
  import wepy from 'wepy';

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

  const urlPrefix = 'http://localhost:8080';
  module.exports = {
    formatTime: formatTime,
    fetch: fetch,
    post: post,
    urlPrefix: urlPrefix,
    unit: UNIT_OF_MEASUREMENT,
    ratio: RMB_TO_KANDIAN_RATIO
  };
