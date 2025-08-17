import { Filter } from "@/types/filter";
import { withApiLoading } from "@/utils/helpers";
import req from "@/utils/req";

export const getBlogs = (filter: Filter) =>
    withApiLoading('get-blogs', () =>
        req.get('/Blog', {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted,
                isPublished: filter.isPublished
            }
        }));

export const createBlog = (formData: any) =>
    withApiLoading('create-blog', () =>
        req.post(`/Blog`, formData));

export const deleteBlog = (id: string) =>
    withApiLoading('delete-blog', () =>
        req.delete(`/Blog/${id}`));

export const getBlogById = (id: string) =>
    withApiLoading('get-blog-by-id', () =>
        req.get(`/Blog/${id}`));

export const updateBlog = (formData: any) =>
    withApiLoading('update-blog', () =>
        req.put(`/Blog`, formData));