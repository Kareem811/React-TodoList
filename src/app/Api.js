export const apiUrl = "http://127.0.0.1:8000/api/todos";

export const fetchData = async () => {
  const response = await fetch(apiUrl);
  return response.json();
};

export const addData = async (todo, file) => {
  const formData = new FormData();
  formData.append("title", todo.title);
  formData.append("description", todo.description);
  if (file) {
    formData.append("file", file);
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const updateData = async (id, todo, file) => {
  const formData = new FormData();
  formData.append("title", todo.title);
  formData.append("description", todo.description);
  if (file) {
    formData.append("file", file);
  }

  const response = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: formData,
  });
  return response.json();
};

export const deleteData = async (id) => {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
};
