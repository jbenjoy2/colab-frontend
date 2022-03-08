import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import ColabAPI from "../../api/colabApi";

export async function initTinyMCE() {
  const key = await ColabAPI.getTinyKey();
  return key;
}
