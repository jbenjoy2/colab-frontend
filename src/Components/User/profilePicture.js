import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Upload } from "antd";
import { updateProfilePictureApi } from "../../actions/user";
import ImgCrop from "antd-img-crop";

export default function ProfilePictureUpload({
  user,
  showModal,
  setShowModal,
}) {
  const [fileList, setFileList] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const dispatch = useDispatch();
  const updateProfilePicture = async (username, data) => {
    const updateCurrUser = updateProfilePictureApi(username, data);
    await updateCurrUser(dispatch);
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const dummyRequest = ({ file, onSuccess, onError }) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    setTimeout(async () => {
      try {
        if (!isJpgOrPng) {
          throw new Error("Please upload either a .png or .jpg file");
        }
        if (!isLt2M) {
          throw new Error("Image must smaller than 2MB!");
        }
        const base64 = await getBase64(file);
        setFileUrl(base64);
        setUploadError("");
      } catch (error) {
        console.log("caught!");
        setUploadError(error.message);
        setFileList([]);
      }
      onSuccess("OK");
    }, 0);
  };

  //   const beforeUpload = (file) => {
  //     console.log(file.type);
  //     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  //     const isLt2M = file.size / 1024 / 1024 < 2;

  //     return isJpgOrPng && isLt2M;
  //   };
  const handleOk = async (photoUrl) => {
    console.log("photoUrL OK", photoUrl);
    try {
      await updateProfilePicture(user.username, photoUrl);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };
  return (
    <Modal
      title="Upload Profile Picture"
      visible={showModal}
      onCancel={() => setShowModal(false)}
      onOk={async () => await handleOk(fileUrl)}
      centered
    >
      <ImgCrop grid={true} quality={1}>
        <Upload
          customRequest={dummyRequest}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          className="text-center"
          // beforeUpload={beforeUpload}
        >
          {fileList.length < 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
      {uploadError && <div className="alert alert-danger">{uploadError}</div>}
    </Modal>
  );
}
