import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/content";
export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
export const size = {width:1200,height:630};
export const contentType = "image/png";
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(),"public/brand/atx-social.png"));
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",background:"#080d16",color:"#eef7ff",padding:65}}>
    <div style={{display:"flex",flexDirection:"column",width:650}}><div style={{fontSize:30,color:"#88edff",marginBottom:45}}>AiTroniXus</div><div style={{fontSize:76,fontWeight:700,letterSpacing:-4,lineHeight:1.05}}>The future. Intelligently engineered.</div><div style={{fontSize:22,color:"#8b9eb5",marginTop:35}}>AI · Cloud · Software · Infrastructure</div></div>
    <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={440} height={440} />
  </div>,size);
}
