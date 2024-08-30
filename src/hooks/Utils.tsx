export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  return (
    `${addr.substring(0, 8)}...` +
    `${addr.substring(addr.length - 6, addr.length)}`
  );
};

export const toDateStr = (timestamp: number | null) => {
  if (timestamp) {
    timestamp = Number(timestamp);
    const time = new Date(timestamp);
    const y = time.getFullYear();
    const M = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    const result =
      y +
      '-' +
      addZero(M) +
      '-' +
      addZero(d) +
      ' ' +
      addZero(h) +
      ':' +
      addZero(m) +
      ':' +
      addZero(s);
    return result;
  } else {
    return timestamp;
  }
};

export const toDate = (timestamp: number | null) => {
  if (timestamp) {
    timestamp = Number(timestamp);
    const time = new Date(timestamp);
    const y = time.getFullYear();
    const M = time.getMonth() + 1;
    const d = time.getDate();
    const result = y + '-' + addZero(M) + '-' + addZero(d);
    return result;
  } else {
    return timestamp;
  }
};

export const addZero = (m: number) => {
  return m < 10 ? '0' + m : m;
};

export const toFixed2 = (num: number) => {
  if (!num) {
    return 0;
  }
  const res = num.toString().split('.');
  if (res.length > 1) {
    const len = res[1].length;
    if (len > 2) {
      return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
    } else {
      return num;
    }
  } else {
    return num;
  }
};

export function isEmptyObject(obj: object): boolean {
  if (!obj) {
    return true;
  } else {
    return Object.keys(obj).length === 0;
  }
}

export function isNotEmptyObject(obj: object): boolean {
  if (!obj) {
    return true;
  } else {
    return Object.keys(obj).length > 0;
  }
}
