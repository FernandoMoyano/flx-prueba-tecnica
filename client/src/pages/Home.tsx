//HOME.TSX
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { UserTable } from "../components/UserTable";
import { UserAddModal } from "../components/UserAddModal";
import { PaginationUser } from "../components/PaginationUser";
import { Breadcrumb, Button, Layout, Select, theme, Input } from "antd";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { Content, Header } from "antd/es/layout/layout";
import { User } from "../interfaces/User";
import { Link, useNavigate, useParams } from "react-router-dom";

const { Search } = Input;

export const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const {
    users,
    totalUsers,
    isLoading,
    currentPage,
    search,
    statusFilter,
    setSearch,
    setStatusFilter,
    setCurrentPage,
    handleAdd,
    filterUsers,
    handleLoading,
  } = userContext;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredUsers = filterUsers(users, search, statusFilter);
  const totalPages = Math.ceil(totalUsers / 10);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      navigate(`/users/${id}`);
    }
  }, [id, navigate]);

  //Manejo del agregado dee usuarios___________

  const handleConfirmAdd = (newUser: User) => {
    handleLoading(async () => {
      await handleAdd(newUser);
      setIsAddModalOpen(false);
    });
  };

  //Manejo de la cancelacion de agregado__________

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  //Manejo del cambio de busqueda por nombre_______________

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  //Manejo de la seleccion de estdo__________

  const onStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  //cambio de pagina__________________

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout className='layout'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header className='header'>
            <Link to={"/"}>
              <img
                src='https://flexxus.com.ar/wp-content/uploads/logo-flexxus-header.png'
                width={200}
              />
            </Link>
          </Header>
          <Content style={{ padding: "0 48px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
              <Breadcrumb.Item>Listados de usuarios</Breadcrumb.Item>
            </Breadcrumb>

            <div className='container-search'>
              <div>
                <Search
                  placeholder='Buscar usuarios'
                  style={{ width: 300, marginBottom: 20, marginRight: 20 }}
                  value={search}
                  onChange={onSearchChange}
                />
                <Select
                  placeholder='Filtrar por estado'
                  onChange={onStatusChange}
                  allowClear
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                />
              </div>
              <Button
                type='primary'
                onClick={() => setIsAddModalOpen(true)}
                style={{ marginBottom: 16 }}>
                Agregar Usuario
              </Button>
            </div>

            <div
              style={{
                padding: 24,
                minHeight: 400,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}>
              <UserAddModal
                open={isAddModalOpen}
                onOk={handleConfirmAdd}
                onCancel={handleCancelAdd}
              />
              <UserTable data={filteredUsers} />
            </div>

            <div>Total de usuarios: {totalUsers}</div>

            <PaginationUser
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Content>
        </>
      )}
    </Layout>
  );
};

export default Home;
