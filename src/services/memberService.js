import api from './api.js';

export const memberService = {
  /**
   * Create a new member with image upload
   * @param {Object} memberData - The member data to create
   * @param {File} imageFile - The image file to upload (optional)
   * @returns {Promise<Object>} - The created member data or error
   */
  async createMember(memberData, imageFile = null) {
    try {
      // Create FormData for multipart/form-data request
      const formData = new FormData();
      
      // Add all member data to form
      Object.keys(memberData).forEach(key => {
        if (memberData[key] !== null && memberData[key] !== undefined) {
          formData.append(key, memberData[key]);
        }
      });
      
      // Add image file if provided
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }
      
      const response = await api.post('/api/members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Member created successfully'
      };
    } catch (error) {
      console.error('Error creating member:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || 'An error occurred';
        
        return {
          success: false,
          error: {
            status,
            message,
            details: error.response.data
          }
        };
      } else if (error.request) {
        // Network error
        return {
          success: false,
          error: {
            status: 'NETWORK_ERROR',
            message: 'Unable to connect to server. Please check your connection.',
            details: error.message
          }
        };
      } else {
        // Other error
        return {
          success: false,
          error: {
            status: 'UNKNOWN_ERROR',
            message: 'An unexpected error occurred.',
            details: error.message
          }
        };
      }
    }
  },

  /**
   * Create a member with base64 image (alternative method)
   * @param {Object} memberData - The member data including base64 image
   * @returns {Promise<Object>} - The created member data or error
   */
  async createMemberWithBase64(memberData) {
    try {
      // If profileImage is base64, convert it to a File object
      if (memberData.profileImage && memberData.profileImage.startsWith('data:image')) {
        const base64Data = memberData.profileImage;
        const [header, data] = base64Data.split(',');
        const mimeType = header.match(/data:([^;]+)/)[1];
        const byteCharacters = atob(data);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        const file = new File([byteArray], 'profile-image', { type: mimeType });
        
        // Remove the base64 string from memberData and use file upload
        const cleanMemberData = { ...memberData };
        delete cleanMemberData.profileImage;
        
        return await this.createMember(cleanMemberData, file);
      } else {
        // No image, proceed with regular data
        return await this.createMember(memberData);
      }
    } catch (error) {
      console.error('Error creating member with base64:', error);
      return {
        success: false,
        error: {
          status: 'CONVERSION_ERROR',
          message: 'Failed to process image data.',
          details: error.message
        }
      };
    }
  },

  /**
   * Get all members
   * @returns {Promise<Object>} - List of members or error
   */
  async getAllMembers() {
    try {
      const response = await api.get('/api/members');
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Members retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching members:', error);
      return {
        success: false,
        error: {
          message: error.response?.data?.message || 'Failed to fetch members',
          details: error.message
        }
      };
    }
  },

  /**
   * Get member by ID
   * @param {string} id - Member ID
   * @returns {Promise<Object>} - Member data or error
   */
  async getMemberById(id) {
    try {
      const response = await api.get(`/api/members/${id}`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Member retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching member:', error);
      return {
        success: false,
        error: {
          message: error.response?.data?.message || 'Failed to fetch member',
          details: error.message
        }
      };
    }
  }
};

export default memberService;
