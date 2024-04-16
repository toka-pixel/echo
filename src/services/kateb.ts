
const callKateb = (audioData: Blob) => {
  const formdata = new FormData();
  formdata.append("file", audioData, "file.wav");

  const requestOptions: RequestInit = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch("https://echo-6sdzv54itq-uc.a.run.app/kateb", requestOptions);
};

export default callKateb;
