/* eslint-disable react/no-unescaped-entities */
import Button from "@/common/components/button/Button";
import { Divider, Form, InputNumber } from "antd";
import { useForm } from "antd/lib/form/Form";
import dynamic from "next/dynamic";
import { useState } from "react";
import { evaluateSuitability } from "../services/fuzzy.service";
import styles from "../styles/fuzzy.module.scss";
import { FuzzyInput } from "../types/FuzzyInput";
import { FuzzyOutput } from "../types/FuzzyOutput";

const Column = dynamic(
  (): any => import("@ant-design/plots").then((item) => item.Column),
  {
    ssr: false,
  }
);
const FuzzySystems = () => {
  const [form] = useForm();
  const [suitability, setSuitability] = useState<FuzzyOutput>();

  const handleEvaluate = async () => {
    const input: FuzzyInput = form.getFieldsValue();
    await evaluateSuitability(input)
      .then((response) => setSuitability(response.data))
      .catch((error) => console.log(error));
  };

  const getData = () => {
    return [
      { type: "Development", evaluation: suitability?.development },
      { type: "Cryptocurrency mining", evaluation: suitability?.crypto },
      { type: "Gaming", evaluation: suitability?.videoGames },
      { type: "Business use", evaluation: suitability?.business },
      { type: "Home use", evaluation: suitability?.home },
      { type: "Hosting", evaluation: suitability?.hosting },
    ];
  };

  return (
    <div className={styles.wrapper}>
      <h1>Fuzzy systems</h1>


      <h2>Evaluate suitability for different purposes</h2>
      <p>
        Input component properties to evaluate the suitability of the build for{" "}
        <b>development</b>, <b>cryptocurrency mining</b>, <b>gaming</b>,{" "}
        <b>business use</b>, <b>home use</b> and <b>hosting</b>.
      </p>
      <Form form={form} className={styles.form} onFinish={handleEvaluate}>
        <Form.Item

          name="cpuClockSpeed"
          rules={[{ required: true, message: "This field is required." }]}
        >
          <h3>CPU clock speed  </h3>
          <InputNumber
            style={{ width: "300px" }}
            placeholder="CPU clock speed"
            addonAfter="GHz"
          />
        </Form.Item>
        <Form.Item
          name="cpuCoreCount"
          rules={[{ required: true, message: "This field is required." }]}
        >
          <h3>CPU core count  </h3>
          <InputNumber
            style={{ width: "300px" }}
            placeholder="CPU core count"
          />
        </Form.Item>
        <Form.Item
          name="cpuThreadCount"
          rules={[{ required: true, message: "This field is required." }]}
        ><h3>CPU thread count </h3>
          <InputNumber
            style={{ width: "300px" }}
            placeholder="CPU thread count"
          />
        </Form.Item>
        <Form.Item
          name="gpuClockSpeed"
          rules={[{ required: true, message: "This field is required." }]}
        >
          <h3>GPU clock speed</h3>
          <InputNumber
            style={{ width: "300px" }}
            placeholder="GPU clock speed"
            addonAfter="MHz"
          />
        </Form.Item>
        <Form.Item
          name="gpuVramSize"
          rules={[{ required: true, message: "This field is required." }]}
        >
          <h3>GPU VRAM size</h3>
          <InputNumber style={{ width: "300px" }} placeholder="GPU VRAM size" />
        </Form.Item>
        <Form.Item
          name="powerSupply"
          rules={[{ required: true, message: "This field is required." }]}
        ><h3>Power supply</h3>
          <InputNumber
            style={{ width: "300px" }}
            placeholder="Power supply"
            addonAfter="W"
          />
        </Form.Item>
        <Form.Item
          name="ramSize"
          rules={[{ required: true, message: "This field is required." }]}
        ><h3>RAM size</h3>
          <InputNumber
            style={{ width: "300px" }}
            placeholder="RAM size"
            addonAfter="GB"
          />
        </Form.Item>
        <Form.Item
          name="ramSpeed"
          rules={[{ required: true, message: "This field is required." }]}
        >
          <h3>RAM speed</h3>
          <InputNumber
            style={{ width: "300px" }}
            placeholder="RAM speed"
            addonAfter="MHz"
          />
        </Form.Item>
        <Form.Item
          name="storageCapacity"
          rules={[{ required: true, message: "This field is required." }]}
        ><h3>Storage capacity</h3>
          <InputNumber
            style={{ width: "300px"}}
            placeholder="Storage capacity"
            addonAfter="GB"
          />
        </Form.Item>
        <Button type="primary" text="Evaluate" style={{ width: "500px" }} />
      </Form>
      {!!suitability && (
        <>
          <Divider orientation="left" orientationMargin={0}>
            Results
          </Divider>
          <Column
            // @ts-ignore
            data={getData()}
            xField={"type"}
            yField={"evaluation"}
            color="#90b3ff"
          />
        </>
      )}
    </div>
  );
};

export default FuzzySystems;
