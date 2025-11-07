export async function getUser() {
  // In a real app, you'd check cookies or JWT here.
  // For now, just simulate logged-in vs guest.

  const loggedIn = true; // We can change this file to simulate the login state
  if (loggedIn) {
    return { 
      id: 1, 
      name: "Tuan Le",
      role: "recorder", //change this attribute to the one's page you want an access
    };
  }
  return null;
}