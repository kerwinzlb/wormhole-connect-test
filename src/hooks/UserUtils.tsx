import message from 'components/Alert';

export async function checkLogin(userAddress: string) {
  if (!userAddress) {
    return false;
  }
  const res = await fetch(`${process.env.apiHost}/checkLogin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userAddress: userAddress }),
  });
  const result = await res.json();
  console.log(result);
  if (result.success) {
    if (result.data.toLowerCase() === userAddress.toLowerCase()) {
      return true;
    }
  }
  console.log('-------');
  const timeStamp = new Date().getTime();
  const signMassage = JSON.stringify({ method: 'login', timeStamp: timeStamp });
  console.log('message', signMassage);
  try {
    const signer = window.ethereum;
    const signature = await signer.request({
      method: 'personal_sign',
      params: [userAddress, signMassage],
      userAddress,
    });
    console.log(signature); // 输出加签信息

    const resLogin = await fetch(`${process.env.apiHost}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAddress: userAddress,
        signature: signature,
        timeStamp: timeStamp,
      }),
    });
    const resultLogin = await resLogin.json();
    if (resultLogin.success) {
      message.success('Login success', 3000);
    } else {
      message.error('Login signature error', 3000);
    }
  } catch (error) {
    console.error(error);
    message.error('Login signature error', 3000);
  }
  return false;
}
