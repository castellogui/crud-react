import { List, Avatar, Button } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useQuery } from "react-query";
import users from "../assets/users.json";

export default function SearchableListUsers() {
  const data = users;
  const [searchTerm, setSearchTerm] = useState("");
  const dataFiltered = data.filter((user) => {
    return (
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.name} ${user.familyName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  function callbackSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <Search
        placeholder="Search user by name, email or company name."
        onSearch={() => {}}
        onChange={callbackSearchTerm}
        style={{ width: "100%" }}
      />
      <List
        style={{ overflowY: "scroll", overflowX: "hidden", height: "70%", marginTop: "0.8rem" }}
        dataSource={dataFiltered}
        renderItem={(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={`${item.name} ${item.familyName}`}
              description={item.email}
            />
            <div>
              <Button type="primary" block style={{ backgroundColor: "#245ce4" }}>
                Edit
              </Button>
            </div>
          </List.Item>
        )}
      />
    </>
  );
}
