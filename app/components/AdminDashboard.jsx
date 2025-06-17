
// AdminDashboard.jsx - Admin Area for Managing Members

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { getAllMembers, deleteMember, addMember, updateMember } from "../utils/adminApi";

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    fullName: "",
    email: "",
    phone: "",
    memberId: ""
  });
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editedMember, setEditedMember] = useState({});

  const router = useRouter();

  const fetchMembers = async () => {
    const data = await getAllMembers();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (memberId) => {
    await deleteMember(memberId);
    fetchMembers();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addMember(newMember);
    setNewMember({ fullName: "", email: "", phone: "", memberId: "" });
    fetchMembers();
  };

  const handleEdit = (member) => {
    setEditingMemberId(member.memberId);
    setEditedMember(member);
  };

  const handleUpdate = async () => {
    await updateMember(editingMemberId, editedMember);
    setEditingMemberId(null);
    fetchMembers();
  };

  const goToContributions = () => {
    router.push("/contributions");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">All Members</h1>
        <Button variant="outline" onClick={goToContributions}>View Contributions</Button>
      </div>

      <Card className="mb-6">
        <CardContent className="space-y-2 p-4">
          <h2 className="text-lg font-medium">Add New Member</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Input
              placeholder="Full Name"
              value={newMember.fullName}
              onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
              required
            />
            <Input
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              required
            />
            <Input
              placeholder="Phone"
              value={newMember.phone}
              onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
              required
            />
            <Input
              placeholder="Member ID"
              value={newMember.memberId}
              onChange={(e) => setNewMember({ ...newMember, memberId: e.target.value })}
              required
            />
            <div className="col-span-1 md:col-span-4">
              <Button type="submit">Add Member</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Member ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editingMemberId === member.memberId ? (
                      <Input
                        value={editedMember.fullName}
                        onChange={(e) => setEditedMember({ ...editedMember, fullName: e.target.value })}
                      />
                    ) : (
                      member.fullName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMemberId === member.memberId ? (
                      <Input
                        value={editedMember.email}
                        onChange={(e) => setEditedMember({ ...editedMember, email: e.target.value })}
                      />
                    ) : (
                      member.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMemberId === member.memberId ? (
                      <Input
                        value={editedMember.phone}
                        onChange={(e) => setEditedMember({ ...editedMember, phone: e.target.value })}
                      />
                    ) : (
                      member.phone
                    )}
                  </TableCell>
                  <TableCell>{member.memberId}</TableCell>
                  <TableCell className="space-x-2">
                    {editingMemberId === member.memberId ? (
                      <Button onClick={handleUpdate}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEdit(member)}>Edit</Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(member.memberId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
