import { getUserApi, UpdateUserDto, UserDto, UserShortDto } from "@/api";
import UserForm from "@/components/users/UserForm";
import { use } from "react";

type EditUserModalProps = {
  user: Promise<UserDto>;
  onSave(user: UserShortDto): void;
  onClose(): void;
};

export default function EditUserModal(props: EditUserModalProps) {
  const user = use(props.user);

  function updateUser(newUser: UpdateUserDto) {
    getUserApi()
      .userControllerUpdate({ id: user.id, updateUserDto: newUser })
      .then(props.onSave);
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-content box">
        <p className="title is-3">Editar usuario</p>
        <UserForm mode="edit" user={user} onSave={updateUser} />
      </div>
      <div className="modal-close" onClick={props.onClose} />
    </div>
  );
}
