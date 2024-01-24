import styles from "../../../utils/styles";
import {ACTIVATE_USER} from "../../../graphql/actions/activation.action";
import { useMutation } from "@apollo/client";
import { FC, useRef, useState } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";

type Props = {
  setActiveState: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setActiveState }) => {
  const [ActivateUser, { loading }] = useMutation(ACTIVATE_USER);
  const [invalidError, setInvalidError] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    const activationToken = localStorage.getItem("activation_token");

    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    } else {
      const data = {
        activationToken,
        activationCode: verificationNumber,
      };
      try {
        await ActivateUser({
          variables: data,
        });
        localStorage.removeItem("activation_token");
        toast.success("Account activated successfully!");
        setActiveState("Login");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError ? "shake border-red-500" : "border-white"
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button
          className={`${styles.button}`}
          disabled={loading}
          onClick={verificationHandler}
        >
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-white">
        Go back to sign in?
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setActiveState("Login")}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification;
