export class Contant {
    public static SERVER_HOST = "http://localhost:8080";

    public static API_PREFIX = "/api/v1";

    public static URL_PREFIX = Contant.SERVER_HOST + Contant.API_PREFIX;

    /**
     * URL role
     */
    public static URL_GET_ROLE = Contant.URL_PREFIX + "/admin/role";

    /**
     * URL empl for admin
     */
    public static URL_EMPLOYEE_FOR_ADMIN = Contant.URL_PREFIX + "/admin/employee";
    


    public static EXAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUxYWU4ODE2NzE3NDFlYjA4OTNkNTMiLCJmdWxsbmFtZSI6IlN1cGVyIEFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGhvdG1haWwuY29tIiwicm9sZSI6eyJwZXJtaXNzaW9uIjpbIkFMTCJdLCJfaWQiOiI1YjUxOWI5NThjNTMwMjBmZWNiZWExZDIiLCJuYW1lIjoiU1VQRVJfQURNSU4ifSwiZGF0ZVdvcmtpbmciOiIyMDE4LTA3LTIwVDA5OjQyOjMwLjU5OVoiLCJpYXQiOjE1MzI1MDQwODIsImV4cCI6MTUzMzgxODA4Mn0.rNT49mJ2vJbu2SUKmDF9xpBb5rtvmoJHoSI46ZiEd84";
}