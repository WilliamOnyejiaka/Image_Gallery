class ImageService {
  private baseUrl;

  public constructor() {
    this.baseUrl = "/api/routes/image";
  }

  public async postImage(formData: FormData, token: any) {
    const response: any = await fetch(`${this.baseUrl}/upload-image`, {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  }

  public async getImage(imageId: number, token: string) {
    const response: any = await fetch(
      `${this.baseUrl}/get-image?id=${imageId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  }

  public async getAllImages(token: string,page: number = 1, limit:number = 10) {
    const response: any = await fetch(
      `${this.baseUrl}/get-all-images?page=${page}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  }

  public async deleteImage(imageId:string,token:string) {
    const response = await fetch(`${this.baseUrl}/delete-image?id=${imageId}`,{
      method:'DELETE',
      credentials:'include',
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

    return await response.json();
  }
}

export default ImageService;
