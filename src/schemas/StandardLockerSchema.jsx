import * as Yup from "yup";

export const StandardLockerSchema = Yup.object({
  amountyouwanttolock: Yup.number().required("Please Enter Amount"),
  unlocktime: Yup.date().required("Please Enter Date!"),
  logourl: Yup.string(),
  //   logourl: Yup.string().required("Please Enter Url"),
  destinationaddress: Yup.string().required(
    "Please Enter Your Destination Address"
  ),
  // numberofvests: Yup.number().required("Please Enter Number of Vests"),
  // vestingtime: Yup.date().required("Please Enter Vesting Date!"),
});
