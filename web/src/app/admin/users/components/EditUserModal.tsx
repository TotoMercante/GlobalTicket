import { getUserApi, type StandardUserDto, type UpdateUserDto } from "@/api";
import UserForm from "@/components/users/UserForm";

type EditUserModalProps = {
  user: StandardUserDto;
  onSave(user: StandardUserDto): void;
  onClose(): void;
};

export default function EditUserModal(props: EditUserModalProps) {
  function updateUser(user: UpdateUserDto) {
    getUserApi()
      .userControllerUpdate({ id: props.user.id, updateUserDto: user })
      .then(props.onSave);
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-content box">
        <p className="title is-3">Editar usuario</p>
        <UserForm mode="edit" user={props.user} onSave={updateUser} />
      </div>
      <div className="modal-close" onClick={props.onClose} />
    </div>
  );
}
