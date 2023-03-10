import React, { useEffect } from "react";
import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatPhimUploadAction,
  layThongTinPhimAction,
} from "redux/actions/actions";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { thongTinPhim } = useSelector((state) => state.reducer);

  useEffect(() => {
    dispatch(layThongTinPhimAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      values.maNhom = "GP04";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      dispatch(capNhatPhimUploadAction(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/jpg" ||
      file.type === "image/gif"
    ) {
      await formik.setFieldValue("hinhAnh", file);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <h3>Th??m m???i phim</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="T??n phim">
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item label="M?? t???">
        <TextArea
          rows={4}
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item label="Ng??y kh???i chi???u">
        <DatePicker
          format="DD/MM/YYYY"
          onChange={handleChangeDatePicker}
          value={moment(formik.values.ngayKhoiChieu, "DD/MM/YYYY")}
        />
      </Form.Item>
      <Form.Item label="??ang chi???u" valuePropName="checked">
        <Switch
          name="dangChieu"
          onChange={handleChangeSwitch("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item label="S???p chi???u" valuePropName="checked">
        <Switch
          name="sapChieu"
          onChange={handleChangeSwitch("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch
          name="hot"
          onChange={handleChangeSwitch("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      <Form.Item label="S??? sao">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
          min={1}
          max={10}
          value={formik.values.danhGia}
        />
      </Form.Item>
      <Form.Item label="H??nh ???nh">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/gif"
        />
        <img
          style={{ width: 150, height: 150, marginTop: 15 }}
          src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
          alt="..."
        />
      </Form.Item>
      <Form.Item label="T??c v???">
        <button
          type="submit"
          className="p-2 rounded border-none cursor-pointer bg-blue-900 text-white"
        >
          C???p nh???t
        </button>
      </Form.Item>
    </Form>
  );
};

export default Edit;
