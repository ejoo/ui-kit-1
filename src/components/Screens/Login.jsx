import PropTypes from "prop-types";
import React, { useState } from "react";
import XolaLogo from "../../images/XolaLogo";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { Checkbox } from "../Forms/Checkbox";
import { FormGroup } from "../Forms/FormGroup";
import { Input } from "../Forms/Input";
import { Label } from "../Forms/Label";
import { Spinner } from "../Spinner";
import "./Login.css";

export const Login = ({ defaultValues, isLoading = false, error = null, onSubmit }) => {
    const [values, setValues] = useState({ email: "", password: "", shouldRemember: false, ...defaultValues });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setValues({ ...values, [name]: checked });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(values);
    };

    return (
        <div className="login-container h-screen bg-opacity-40 bg-white">
            <div className="flex flex-col justify-center items-center space-y-8 w-full h-[90%] md:full">
                <div className="px-9 md:py-10 w-82 py-0 rounded-lg md:bg-white">
                    <div className="md:mb-10 mb-12">
                        <XolaLogo className="md:h-12 md:mb-20 w-auto h-10 mx-auto" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <fieldset className="space-y-6" disabled={isLoading}>
                            <div className="-space-y-px bg-white rounded-md">
                                <FormGroup className="md:mb-7">
                                    <Label>Email</Label>

                                    <Input
                                        required
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={values.email}
                                        isError={!!error}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Password</Label>

                                    <Input
                                        required
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={values.password}
                                        isError={!!error}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </div>

                            <Checkbox
                                name="shouldRemember"
                                label="Remember me"
                                checked={values.shouldRemember}
                                onChange={handleCheckboxChange}
                            />

                            {error ? <Alert color="danger">{error}</Alert> : null}

                            <Button type="submit" className="w-full" color="primary">
                                {isLoading ? <Spinner size="current" color="current" className="mr-2" /> : null}
                                Login
                            </Button>

                            <div className="mt-5 text-sm text-center">
                                <a
                                    href="https://xola.com/resetting/form"
                                    className="text-gray-darker hover:text-black font-semibold underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

            <footer>
                <div className="flex flex-col items-center justify-center w-full px-4 py-1 overflow-hidden sm:px-6 lg:px-8">
                    <div className="px-4 m-5 w-82 opacity-30 hover:opacity-80 md:text-sm text-xs text-center rounded-lg">
                        <a href="https://www.xola.com/team" target="_blank" className="md:text-gray" rel="noreferrer">
                            Handcrafted in Houston, Belgrade & Bengaluru
                            <div className="text-center">&copy; {new Date().getFullYear()} Xola, Inc.</div>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

Login.propTypes = {
    defaultValues: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
        shouldRemember: PropTypes.bool,
    }),
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    onSubmit: PropTypes.func,
};
