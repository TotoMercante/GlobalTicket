import { getUserApi, type StandardUserDto, type CreateUserDto } from "@/api";
import UserForm from "@/components/users/UserForm";

type NewUserModalProps = {
  active: boolean;
  onSave(user: StandardUserDto): void;
  onClose(): void;
};

export default function NewUserModal(props: NewUserModalProps) {
  function save(user: CreateUserDto) {
    getUserApi()
      .userControllerCreateUser({ createUserDto: user })
      .then(props.onSave)
      .catch(console.error);
  }

  return (
    <>
      <div className={`modal ${props.active && "is-active"}`}>
        <div className="modal-background" onClick={props.onClose} />
        <div className="modal-content box">
          <p className="title is-3">Nuevo usuario</p>
          <UserForm mode="new" onSave={save} />
        </div>
        <div className="modal-close" onClick={props.onClose} />
      </div>
    </>
  );
}
