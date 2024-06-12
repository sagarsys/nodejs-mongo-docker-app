const defaultUser = {
  name: "John Prick",
  email: "john.prick@gmail.com",
  interests: "fishing, chilling",
};

(async function init() {
  const response = await fetch("http://localhost:3000/profile").catch(
    () => undefined
  );
  console.log({ response });
  const user = (await response?.json()) || {};
  console.log({ user });

  document.getElementById("name").textContent = user.name ?? defaultUser.name;
  document.getElementById("email").textContent =
    user.email ?? defaultUser.email;
  document.getElementById("interests").textContent =
    user.interests ?? defaultUser.interests;

  const cont = document.getElementById("container");
  cont.style.display = "block";

  document.getElementById("edit-btn").addEventListener("click", updateProfile);
  document
    .getElementById("update-btn")
    .addEventListener("click", handleUpdateProfileRequest);
})();

function updateProfile() {
  const contEdit = document.getElementById("container-edit");
  const cont = document.getElementById("container");

  document.getElementById("input-name").value =
    document.getElementById("name").textContent;
  document.getElementById("input-email").value =
    document.getElementById("email").textContent;
  document.getElementById("input-interests").value =
    document.getElementById("interests").textContent;

  cont.style.display = "none";
  contEdit.style.display = "block";
}

async function handleUpdateProfileRequest() {
  const contEdit = document.getElementById("container-edit");
  const cont = document.getElementById("container");

  const payload = {
    name: document.getElementById("input-name").value,
    email: document.getElementById("input-email").value,
    interests: document.getElementById("input-interests").value,
  };

  const response = await fetch("http://localhost:3000/profile", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const jsonResponse = await response.json();

  document.getElementById("name").textContent = jsonResponse.name;
  document.getElementById("email").textContent = jsonResponse.email;
  document.getElementById("interests").textContent = jsonResponse.interests;

  cont.style.display = "block";
  contEdit.style.display = "none";
}
