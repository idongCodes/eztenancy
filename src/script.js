const app = document.getElementById('app');
let verificationCode = '';
let currentUser = null;

// Utility to save users
const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

// Utilities
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

function renderLogin() {
  app.innerHTML = `
    <h2>Login</h2>
    <label>Enter email or mobile number</label>
    <input id="loginInput" type="text" />
    <button onclick="sendCode()">Send Code</button>
  `;
}

function sendCode() {
  const input = document.getElementById('loginInput').value.trim();
  const users = getUsers();
  const user = users.find(u => u.email === input || u.phone === input);
  if (!user) {
    alert('User not found. Please register.');
    renderRegister();
    return;
  }
  verificationCode = generateCode();
  currentUser = user;
  console.log("Code sent (simulated):", verificationCode);
  app.innerHTML = `
    <h2>Verify Code</h2>
    <p>Enter the 6-digit code sent to your contact.</p>
    <input id="codeInput" type="text" maxlength="6"/>
    <button onclick="verifyCode()">Verify</button>
  `;
}

function verifyCode() {
  const code = document.getElementById('codeInput').value.trim();
  if (code === verificationCode) {
    renderPortal(currentUser);
  } else {
    alert("Invalid code");
  }
}

function renderRegister() {
  app.innerHTML = `
    <h2>Register</h2>
    <input placeholder="First Name" id="firstName"/>
    <input placeholder="Last Name" id="lastName"/>
    <input placeholder="Email" id="email"/>
    <input placeholder="Mobile Number" id="phone"/>
    <select id="role">
      <option value="tenant">Tenant</option>
      <option value="landlord">Landlord</option>
      <option value="admin">Admin</option>
    </select>
    <input type="file" id="profilePic" accept="image/*"/>
    <button onclick="registerUser()">Register</button>
    <p>Already have an account? <a href="#" onclick="renderLogin()">Login here</a></p>
  `;
}

function registerUser() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const role = document.getElementById('role').value;
  const file = document.getElementById('profilePic').files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    const users = getUsers();
    users.push({
      firstName,
      lastName,
      email,
      phone,
      role,
      profilePic: reader.result || ''
    });
    saveUsers(users);
    alert("Registration complete! Please login.");
    renderLogin();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onloadend();
  }
}

function renderPortal(user) {
  app.innerHTML = `
    <h2>Welcome, ${user.firstName} (${user.role})</h2>
    ${user.profilePic ? `<img src="${user.profilePic}" alt="Profile Picture"/>` : ''}
    <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Role:</strong> ${user.role}</p>
    <button id="logoutBtn" onclick="logout()">Logout</button>
  `;
}

function logout() {
  currentUser = null;
  verificationCode = '';
  renderLogin();
}

// Initial screen
renderLogin();
