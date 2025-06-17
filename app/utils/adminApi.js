// Mock API utility (replace with real backend logic)
export const getAllMembers = async () => JSON.parse(localStorage.getItem('members') || '[]');
export const addMember = async (member) => {
  const members = await getAllMembers();
  members.push(member);
  localStorage.setItem('members', JSON.stringify(members));
};
export const deleteMember = async (memberId) => {
  const members = await getAllMembers();
  localStorage.setItem('members', JSON.stringify(members.filter(m => m.memberId !== memberId)));
};
export const updateMember = async (id, updated) => {
  const members = await getAllMembers();
  const updatedList = members.map(m => m.memberId === id ? updated : m);
  localStorage.setItem('members', JSON.stringify(updatedList));
};