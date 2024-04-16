const callNatiq = (textData: string) => {
  const formdata = { text: textData };
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formdata),
    redirect: "follow",
  };

  return fetch("https://echo-6sdzv54itq-uc.a.run.app/natiq", requestOptions);
};

export default callNatiq;
