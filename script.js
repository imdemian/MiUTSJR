
const discussionList = document.getElementById("discussion-list");

function createDiscussionItem(title, content) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  discussionList.appendChild(listItem);
}

function loadDiscussions() {
  let discussions = JSON.parse(localStorage.getItem("discussions")) || [];
  discussions.forEach((discussion) => {
    createDiscussionItem(discussion.title, discussion.content);
  });
}

function clearDiscussionForm() {
  document.getElementById("discussion-title").value = "";
  document.getElementById("discussion-content").value = "";
}

function handleDiscussionFormSubmit(event) {
  event.preventDefault();

  const discussionTitle = document.getElementById("title").value; 
  const discussionContent = document.getElementById("content").value;


  let discussions = JSON.parse(localStorage.getItem("discussions")) || [];
  discussions.push({ title: discussionTitle, content: discussionContent });
  localStorage.setItem("discussions", JSON.stringify(discussions));

  createDiscussionItem(discussionTitle, discussionContent);
  clearDiscussionForm();

  window.location.href = "views\inicio\discussions.ejs";
}

window.onload = loadDiscussions;

document.getElementById("discussion-form").addEventListener("submit", handleDiscussionFormSubmit);