import { useEffect, useState } from "react";

interface IUser {
    id: number;
    name: string;
    phone: string;
    website: string;
}

export default function List() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    // Gọi API khi component mount
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>useEffect</h1>
            <ul>
                {users.map((user, index) => (
                    <li
                        key={user.id}
                        style={{
                            cursor: "pointer",
                            margin: "4px 0",
                            color: selectedUser?.id === user.id ? "blue" : "black",
                        }}
                        onClick={() => setSelectedUser(user)}
                    >
                        {index + 1}. {user.name} | {user.phone}
                    </li>
                ))}
            </ul>

            <h2>Thông tin chi tiết</h2>
            {selectedUser ? (
                <div>
                    <p>
                        <b>Họ và tên:</b> {selectedUser.name}
                    </p>
                    <p>
                        <b>Số điện thoại:</b> {selectedUser.phone}
                    </p>
                    <p>
                        <b>Website:</b> {selectedUser.website}
                    </p>
                </div>
            ) : (
                <p>Click vào tên user để xem chi tiết</p>
            )}
        </div>
    );
}
