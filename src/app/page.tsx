import FileUploader from './components/FileUploader';

export default function Home() {
  return (
    <div>
      <h1>Upload an image to split it into its RGB components</h1>
      <FileUploader assetType="RGB_SPLITTING" />
    </div>
  );
}
