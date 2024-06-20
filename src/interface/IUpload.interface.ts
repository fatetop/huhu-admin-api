export interface IUploadFile {
  filename: string; // 文件原名
  data: string; //  mode 为 file 时为服务器临时文件地址
  fieldName: string; // 表单 field 名
  mimeType: string; // mime
}
