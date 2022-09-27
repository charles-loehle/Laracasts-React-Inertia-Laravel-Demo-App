import React from "react";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create(props) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        remember: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/users");
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create New User
                </h2>
            }
        >
            <Head title="Create" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="pb-4">
                                <Link
                                    className="border rounded p-2 text-blue-400 text-sm ml-4"
                                    href="/users"
                                >
                                    Back to all Users
                                </Link>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="max-w-md mx-auto mt-8"
                            >
                                <div className="mb-6">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 uppercase font-bold text-xs text-gray-700 mt-6"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="border border-gray-400 p-2 w-full"
                                        name="name"
                                    />
                                    {errors.name && (
                                        <div className="text-red-600">
                                            {errors.name}
                                        </div>
                                    )}
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 uppercase font-bold text-xs text-gray-700 mt-6"
                                    >
                                        email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="border border-gray-400 p-2 w-full"
                                        name="email"
                                    />
                                    {errors.email && (
                                        <div className="text-red-600">
                                            {errors.email}
                                        </div>
                                    )}
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 uppercase font-bold text-xs text-gray-700 mt-6"
                                    >
                                        password
                                    </label>
                                    <input
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        type="password"
                                        className="border border-gray-400 p-2 w-full"
                                        name="password"
                                    />
                                    {errors.password && (
                                        <div className="text-red-600">
                                            {errors.password}
                                        </div>
                                    )}
                                    <div className="mb-6 mt-6">
                                        <button
                                            className="bg-blue-400 text-white rounded py-2 px-4 hover:bg-blue-500"
                                            disabled={processing}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
