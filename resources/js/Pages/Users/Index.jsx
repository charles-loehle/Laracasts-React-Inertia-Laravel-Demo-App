import { React, useEffect, useState } from "react";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";

export default function Users(props) {
    const { users } = props;
    const [userName, setUserName] = useState("");
    const { flash } = usePage().props;

    useEffect(() => {
        Inertia.get(
            "/users",
            { search: userName },
            { preserveState: true, replace: true }
        );
        // console.log(typeof userName);
    }, [userName]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between pb-4">
                                <Link
                                    className="border rounded p-2 text-blue-400 text-sm ml-4"
                                    href="/users/create"
                                >
                                    New User
                                </Link>
                                <div className="text-blue-600">
                                    {flash.message && (
                                        <div class="alert">{flash.message}</div>
                                    )}
                                </div>
                                <input
                                    className="border px-2 rounded-lg"
                                    placeholder="Search..."
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </div>
                            <table className="w-full border">
                                <tbody>
                                    {users.data.map((user) => {
                                        return (
                                            <tr
                                                key={user.id}
                                                className="bg-gray-100 text-center border-b text-sm text-gray-600"
                                            >
                                                <td className="p-2 border-r">
                                                    {user.name} id: {user.id}
                                                </td>
                                                <td>
                                                    <Link
                                                        href={`/users/${user.id}/edit`}
                                                        className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href="#"
                                                        className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin"
                                                    >
                                                        Remove
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* PAGINATION */}
                <div className="mt-6">
                    {users.links.map((link, key) => (
                        <Link
                            className={link.active ? "font-bold mr-2" : "mr-2"}
                            key={key}
                            href={link.url}
                        >
                            {link.label === "&laquo; Previous"
                                ? "<< Previous"
                                : link.label === "Next &raquo;"
                                ? "Next >>"
                                : link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
