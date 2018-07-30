export class Constant {

    /**
     * Server config
     */
    public static SERVER_HOST = "http://107.113.192.102:3000";

    public static API_PREFIX = "/api/v1";

    public static URL_PREFIX = Constant.SERVER_HOST + Constant.API_PREFIX;

    /**
     * App config
     */
    public static DEFAULT_PAGE_NUMBER = 0;

    public static DEFAULT_PAGE_SIZE = 10;

    public static CODE_SUCCESS = 200;

    public static MSG_SUCCESS = "SUCCESS";

    /**
     * URL role
     */
    public static URL_GET_ROLE = Constant.URL_PREFIX + "/admin/role";

    /**
     * URL empl for admin
     */
    public static URL_EMPLOYEE_FOR_ADMIN = Constant.URL_PREFIX + "/admin/employee";

    /**
     * Category
     */
    public static URL_CATEGORY_MANAGER = Constant.URL_PREFIX + "/category";



    public static EXAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUxYWU4ODE2NzE3NDFlYjA4OTNkNTMiLCJmdWxsbmFtZSI6IlN1cGVyIEFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGhvdG1haWwuY29tIiwicm9sZSI6eyJwZXJtaXNzaW9uIjpbIkFMTCJdLCJfaWQiOiI1YjUxOWI5NThjNTMwMjBmZWNiZWExZDIiLCJuYW1lIjoiU1VQRVJfQURNSU4ifSwiZGF0ZVdvcmtpbmciOiIyMDE4LTA3LTIwVDA5OjQyOjMwLjU5OVoiLCJpYXQiOjE1MzI1MDQwODIsImV4cCI6MTUzMzgxODA4Mn0.rNT49mJ2vJbu2SUKmDF9xpBb5rtvmoJHoSI46ZiEd84";
}